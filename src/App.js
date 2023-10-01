import React, { useState } from 'react';
import './App.css';
import { Modal, MultiSelection, UserFeedback, UserProfile } from './components';

function App() {
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [isUserProfileModalVisible, setIsUserProfileModalVisible] = useState(false); // New state variable

  const [quizQuestion, setQuizQuestion] = useState({
    question: 'What is the capital of France?',
    options: [
      { id: 'paris', label: 'Paris' },
      { id: 'berlin', label: 'Berlin' },
      { id: 'london', label: 'London' },
      { id: 'madrid', label: 'Madrid' },
    ],
    correctAnswer: 'paris',
  });
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const toggleModal1 = () => {
    setIsModalVisible1(!isModalVisible1);
  };

  const toggleModal2 = () => {
    setIsModalVisible2(!isModalVisible2);
  };

  const toggleFeedbackModal = () => {
    setIsFeedbackModalVisible(!isFeedbackModalVisible);
  };

  const toggleUserProfileModal = () => { // New function to toggle user profile modal visibility
    setIsUserProfileModalVisible(!isUserProfileModalVisible);
  };

  const handlePrimaryButtonClick = () => {
    console.log('Primary button clicked in the first modal');
  };

  const handleSecondaryButtonClick = () => {
    console.log('Secondary button clicked in the first modal');
  };

  const handleOptionClick = (optionId) => {
    setSelectedAnswer(optionId);

    if (optionId === quizQuestion.correctAnswer) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
  };

  const handleFeedbackSubmit = (ratings, comment) => {
    setIsFeedbackModalVisible(false);
  };

  return (
    <div className="App">
      <h1>Components demonstration</h1>
      <button onClick={toggleModal1}>Open Modal 1</button>
      <br />
      <br />
      <button onClick={toggleModal2}>Open MultiSelection</button>
      <br />
      <br />
      <button onClick={toggleFeedbackModal}>Open Feedback Form</button>
      <br />
      <br />
      <button onClick={toggleUserProfileModal}>Open User Profile</button> {/* Button to open User Profile */}
      
      <Modal
        title="Sample Modal 1"
        isVisible={isModalVisible1}
        setIsVisible={toggleModal1}
        footerButtons={{
          primary: {
            text: 'Primary',
            onClick: handlePrimaryButtonClick,
          },
          secondary: {
            text: 'Secondary',
            onClick: handleSecondaryButtonClick,
          },
        }}
      >
        <p>This is the content of the first modal.</p>
      </Modal>

      <Modal
        title="Sample Modal 2"
        isVisible={isModalVisible2}
        setIsVisible={toggleModal2}
        footerButtons={{
          primary: {
            text: 'Primary',
            onClick: () => {
              console.log('Primary button clicked in the second modal');
            },
          },
          secondary: {
            text: 'Secondary',
            onClick: () => {
              console.log('Secondary button clicked in the second modal');
            },
          },
        }}
      >
        <MultiSelection
          title={quizQuestion.question}
          options={quizQuestion.options}
          onOptionClick={handleOptionClick}
          currentOption={selectedAnswer}
        />
      </Modal>

      <UserFeedback
        ratingTopics={[
          { label: 'Topic 1', id: 'topic1' },
          { label: 'Topic 2', id: 'topic2' },
          { label: 'Topic 3', id: 'topic3' },
        ]}
        description="Please rate the following topics and provide any comments:"
        hasTextArea={true}
        title="Feedback Form"
        isVisible={isFeedbackModalVisible}
        setIsVisible={setIsFeedbackModalVisible}
        onSubmit={handleFeedbackSubmit}
        secondaryButtonText="Cancel"
      />

      <UserProfile
        isVisible={isUserProfileModalVisible}
        setIsVisible={toggleUserProfileModal}
        initialName='Diogo Vaz'
        initialEmail='diogovaz@gmail.com'
        initialPassword='Abc@1234'
      />
    </div>
  );
}

export default App;
