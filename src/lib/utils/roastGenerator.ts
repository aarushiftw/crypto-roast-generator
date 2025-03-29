
import { roastFlow, classifications, traitsConfig } from "@/lib/data/questions";
import { 
  UserTraits, 
  Classification, 
  RoastResult, 
  UserResponse,
  TraitId,
  Badge,
  TraitDescriptorType
} from "@/lib/types/questionnaire";
import { getRandomItem } from "./helpers";

export function calculateTraits(responses: UserResponse[]): UserTraits {
  const traits: UserTraits = {
    experience: 0,
    portfolio: 0,
    activity: 0,
    risk: 0,
    technical: 0,
    defi: 0
  };

  // Process all user responses to calculate trait scores
  responses.forEach(response => {
    // Extract scores from the response and add to traits
    if (response.scores) {
      Object.entries(response.scores).forEach(([traitId, score]) => {
        if (traitId in traits) {
          traits[traitId as TraitId] = (traits[traitId as TraitId] || 0) + score;
        }
      });
    }
  });

  return traits;
}

export function determineClassification(traits: UserTraits): Classification {
  // Find which classification best matches the user's traits
  for (const classification of classifications) {
    let matches = true;
    
    // Check if user's traits fall within this classification's thresholds
    for (const [traitId, threshold] of Object.entries(classification.thresholds)) {
      const traitValue = traits[traitId as TraitId] || 0;
      if (traitValue < threshold.min || traitValue > threshold.max) {
        matches = false;
        break;
      }
    }
    
    if (matches) {
      return classification;
    }
  }
  
  // Default to the first classification if no match is found
  return classifications[0];
}

export function generateRoastLine(classification: Classification): string {
  const template = getRandomItem(classification.roastTemplates);
  const adjective1 = getRandomItem(classification.adjectives);
  const adjective2 = getRandomItem(classification.adjectives);
  const noun = getRandomItem(classification.nouns);
  
  return template
    .replace('{adjective1}', adjective1)
    .replace('{adjective2}', adjective2)
    .replace('{noun}', noun);
}

export function identifyBadges(responses: UserResponse[]): Badge[] {
  const badges: Badge[] = [];
  const questionBadgeCounts: Record<string, Record<string, number>> = {};
  
  // Initialize counts for each badge-question pair
  traitsConfig.badges.forEach(badge => {
    questionBadgeCounts[badge.id] = {};
    badge.associatedQuestions.forEach(qId => {
      questionBadgeCounts[badge.id][qId] = 0;
    });
  });
  
  // Count qualifying responses for each badge
  responses.forEach(response => {
    traitsConfig.badges.forEach(badge => {
      if (badge.associatedQuestions.includes(response.questionId)) {
        // Logic to determine if this response contributes to this badge
        // For simplicity, we'll just increment the count
        questionBadgeCounts[badge.id][response.questionId]++;
      }
    });
  });
  
  // Award badges where threshold is met
  traitsConfig.badges.forEach(badge => {
    const totalQualifyingResponses = Object.values(questionBadgeCounts[badge.id]).reduce((a, b) => a + b, 0);
    if (totalQualifyingResponses >= badge.threshold) {
      badges.push(badge);
    }
  });
  
  return badges;
}

export function calculatePercentageScore(traits: UserTraits): number {
  // This is a simplified calculation - you would want to customize based on your scoring system
  const totalPossiblePoints = Object.keys(traits).length * 10; // Assuming max score of 10 per trait
  const totalPoints = Object.values(traits).reduce((sum, value) => sum + (value || 0), 0);
  return Math.min(100, Math.round((totalPoints / totalPossiblePoints) * 100));
}

export function generateRoastResult(responses: UserResponse[], traits: UserTraits): RoastResult {
  const classification = determineClassification(traits);
  const roastLine = generateRoastLine(classification);
  const badges = identifyBadges(responses);
  const percentageScore = calculatePercentageScore(traits);
  
  // Select 3 random specific roasts
  const specificRoasts = classification.specificRoasts
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  
  return {
    classificationId: classification.id,
    classificationName: classification.name,
    roastLine,
    specificRoasts,
    traits,
    percentageScore,
    badges
  };
}

export function getRandomRoastOpening(): string {
  return getRandomItem(roastFlow.openings);
}

export function getRandomRoastReaction(): string {
  return getRandomItem(roastFlow.reactions);
}

export function getRandomMidRoastReaction(): string {
  return getRandomItem(roastFlow.midRoastReactions);
}

export function getRandomRoastClosing(): string {
  return getRandomItem(roastFlow.closings);
}

export function getRandomTraitDescriptor(traitType: TraitDescriptorType): string {
  return getRandomItem(roastFlow.traitDescriptors[traitType]);
}
