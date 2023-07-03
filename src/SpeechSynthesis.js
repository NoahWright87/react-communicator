export function markdownToSpeech(markdown) {
  const ssml = markdownToSSML(markdown);
  textToSpeech(ssml);

  if ('speechSynthesis' in window) {
    const msg = new SpeechSynthesisUtterance();
    msg.ssml = markdownToSSML(markdown);
    speechSynthesis.speak(msg);
  } else {
    console.log('Text-to-speech not supported in this browser.');
  }
}

function markdownToSSML(markdown, overrides = {}) {
  const defaultOverrides = {
    // TODO: Decide different rates, add more symbols
    '*': {emphasis: 'moderate', rate: 'slow'},
    '**': {emphasis: 'strong', rate: 'medium'},
    '_': {emphasis: 'moderate', rate: 'slow'},
    '__': {emphasis: 'strong', rate: 'medium'},
  };

  const mergedOverrides = {...defaultOverrides, ...overrides};

  const emphasisMap = {
    none: '',
    moderate: '<emphasis level="moderate">',
    strong: '<emphasis level="strong">',
  };

  const rateMap = {
    fast: '<prosody rate="fast">',
    medium: '',
    slow: '<prosody rate="slow">',
  };

  const splitMarkdown = markdown.split(/(\*\*|\*|__|_)/);

  let ssml = '';

  for (let i = 0; i < splitMarkdown.length; i++) {
    const token = splitMarkdown[i];
    const override = mergedOverrides[token];

    if (override) {
      const {emphasis, rate} = override;
      ssml += `${emphasisMap[emphasis]}${rateMap[rate]}`;
    }

    switch (token) {
      case '**':
      case '__':
        ssml += '<break time="100ms"/>';
      case '*':
      case '_':
        const text = splitMarkdown[i + 1];
        if (text) {
          ssml += `<say-as interpret-as="characters">${text}</say-as>`;
          i++;
        }
        break;
      default:
        ssml += token;
    }

    if (override) {
      ssml += `${rateMap[override.rate]}</prosody>${emphasisMap.none}`;
    }
  }

  return ssml;
}

