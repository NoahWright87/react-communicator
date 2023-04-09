import React, { useState } from 'react';

const Communicator = ({ modes }) => {
  const [currentModeIndex, setCurrentModeIndex] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentVariationIndex, setCurrentVariationIndex] = useState(0);

  const currentMode = modes[currentModeIndex];
  const currentPhrase = currentMode.phrases[currentPhraseIndex];
  const currentVariation = currentPhrase.variations[currentVariationIndex];

  const previousMode = currentModeIndex > 0 ? modes[currentModeIndex - 1] : null;
  const nextMode = currentModeIndex < modes.length - 1 ? modes[currentModeIndex + 1] : null;
  const previousPhrase = currentPhraseIndex > 0 ? currentMode.phrases[currentPhraseIndex - 1] : null;
  const nextPhrase = currentPhraseIndex < currentMode.phrases.length - 1 ? currentMode.phrases[currentPhraseIndex + 1] : null;
  const previousVariation = currentVariationIndex > 0 ? currentPhrase.variations[currentVariationIndex - 1] : null;
  const nextVariation = currentVariationIndex < currentPhrase.variations.length - 1 ? currentPhrase.variations[currentVariationIndex + 1] : null;

  const handlePreviousMode = () => {
    setCurrentModeIndex(currentModeIndex - 1);
    setCurrentPhraseIndex(0);
    setCurrentVariationIndex(0);
  };

  const handleNextMode = () => {
    setCurrentModeIndex(currentModeIndex + 1);
    setCurrentPhraseIndex(0);
    setCurrentVariationIndex(0);
  };

  const handlePreviousPhrase = () => {
    setCurrentPhraseIndex(currentPhraseIndex - 1);
    setCurrentVariationIndex(0);
  };

  const handleNextPhrase = () => {
    setCurrentPhraseIndex(currentPhraseIndex + 1);
    setCurrentVariationIndex(0);
  };

  const handlePreviousVariation = () => {
    setCurrentVariationIndex(currentVariationIndex - 1);
  };

  const handleNextVariation = () => {
    setCurrentVariationIndex(currentVariationIndex + 1);
  };

  return (
    <div>
      <div>
        <button onClick={handlePreviousMode} disabled={!previousMode}>{'<'}</button>
        <div>{previousMode?.name}</div>
        <div>{currentMode.name}</div>
        <div>{nextMode?.name}</div>
        <button onClick={handleNextMode} disabled={!nextMode}>{'>'}</button>
      </div>
      <div>
        <button onClick={handlePreviousPhrase} disabled={!previousPhrase}>{'<'}</button>
        <div>{previousPhrase?.name}</div>
        <div>{currentPhrase.name}</div>
        <div>{nextPhrase?.name}</div>
        <button onClick={handleNextPhrase} disabled={!nextPhrase}>{'>'}</button>
      </div>
      <div>
        <button onClick={handlePreviousVariation} disabled={!previousVariation}>{'<'}</button>
        <div>{previousVariation?.name}</div>
        <div>{currentVariation.name}</div>
        <div>{nextVariation?.name}</div>
        <button onClick={handleNextVariation} disabled={!nextVariation}>{'>'}</button>
      </div>
    </div>
  );
};

export default Communicator;
