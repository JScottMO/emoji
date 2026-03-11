export interface EmojiCombo {
  label: string;
  combo: string;
  mood: string;
}

export const moods = ["Love", "Funny", "Sad", "Hype", "Nature", "Food", "Cool", "Spooky", "Celebration"];

export const emojiCombos: EmojiCombo[] = [
  // Love
  { label: "Head over heels", combo: "😍❤️‍🔥💕", mood: "Love" },
  { label: "Love letter", combo: "💌💝✨", mood: "Love" },
  { label: "Couple goals", combo: "👫💕🌹", mood: "Love" },
  { label: "Heartbreak recovery", combo: "💔🩹❤️", mood: "Love" },
  { label: "Kiss kiss", combo: "😘💋❤️", mood: "Love" },
  { label: "Soulmates", combo: "🥰👩‍❤️‍👨💫", mood: "Love" },

  // Funny
  { label: "I'm dead", combo: "😂💀⚰️", mood: "Funny" },
  { label: "Clown behavior", combo: "🤡🎪😂", mood: "Funny" },
  { label: "Awkward moment", combo: "😬🫠💀", mood: "Funny" },
  { label: "Monkey see", combo: "🙈🙉🙊", mood: "Funny" },
  { label: "Nerd alert", combo: "🤓📚🔬", mood: "Funny" },
  { label: "Oops", combo: "🫢😅💨", mood: "Funny" },

  // Sad
  { label: "Crying river", combo: "😭💧🌊", mood: "Sad" },
  { label: "Broken heart", combo: "💔😢🖤", mood: "Sad" },
  { label: "Lonely night", combo: "🌙😔💭", mood: "Sad" },
  { label: "Missing you", combo: "🥺💭❤️", mood: "Sad" },
  { label: "Under the weather", combo: "🤒🌧️😞", mood: "Sad" },

  // Hype
  { label: "Let's gooo", combo: "🔥🚀💯", mood: "Hype" },
  { label: "Winning streak", combo: "🏆👑✨", mood: "Hype" },
  { label: "Mind blown", combo: "🤯💥🧠", mood: "Hype" },
  { label: "Money moves", combo: "💰📈🤑", mood: "Hype" },
  { label: "Boss mode", combo: "😎💪🔥", mood: "Hype" },
  { label: "Flex time", combo: "💪🏋️‍♂️🥇", mood: "Hype" },

  // Nature
  { label: "Sunrise vibes", combo: "🌅🌿☀️", mood: "Nature" },
  { label: "Ocean breeze", combo: "🌊🐚🏖️", mood: "Nature" },
  { label: "Forest walk", combo: "🌲🍃🦊", mood: "Nature" },
  { label: "Flower garden", combo: "🌸🌷🌻", mood: "Nature" },
  { label: "Stargazing", combo: "🌌✨🔭", mood: "Nature" },

  // Food
  { label: "Pizza night", combo: "🍕🎬🛋️", mood: "Food" },
  { label: "Brunch date", combo: "🥑🍳☕", mood: "Food" },
  { label: "Sushi time", combo: "🍣🥢🍱", mood: "Food" },
  { label: "Sweet tooth", combo: "🍩🍰🍫", mood: "Food" },
  { label: "Taco Tuesday", combo: "🌮🎉💃", mood: "Food" },

  // Cool
  { label: "Chill vibes", combo: "😎🧊🎵", mood: "Cool" },
  { label: "Night owl", combo: "🦉🌙💻", mood: "Cool" },
  { label: "Good vibes", combo: "✨🌟💫", mood: "Cool" },
  { label: "Road trip", combo: "🚗🎶🌄", mood: "Cool" },
  { label: "Gaming session", combo: "🎮🕹️🏆", mood: "Cool" },

  // Spooky
  { label: "Haunted", combo: "👻🏚️🕯️", mood: "Spooky" },
  { label: "Creepy crawly", combo: "🕷️🕸️🦇", mood: "Spooky" },
  { label: "Zombie mode", combo: "🧟‍♂️🧠💀", mood: "Spooky" },
  { label: "Witch vibes", combo: "🧙‍♀️🔮✨", mood: "Spooky" },

  // Celebration
  { label: "Party time", combo: "🎉🥳🎊", mood: "Celebration" },
  { label: "Birthday bash", combo: "🎂🎁🎈", mood: "Celebration" },
  { label: "New Year", combo: "🎆🥂✨", mood: "Celebration" },
  { label: "Graduation", combo: "🎓📜🎉", mood: "Celebration" },
  { label: "Cheers!", combo: "🥂🍾🎊", mood: "Celebration" },
];

export function getCombosByMood(mood: string): EmojiCombo[] {
  return emojiCombos.filter((c) => c.mood === mood);
}

export function getEmojiCombosFor(emoji: string): EmojiCombo[] {
  return emojiCombos.filter((c) => c.combo.includes(emoji)).slice(0, 6);
}
