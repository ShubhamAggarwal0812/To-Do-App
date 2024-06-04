import React from 'react';

const HelpScreen = () => {
  return (
    <div className="container mx-auto p-6 mt-10 bg-white rounded shadow-md">
      <h1 className="text-4xl font-bold mb-5 text-center text-blue-600">Help & Support</h1>
      <p className="text-gray-700 mb-4">
        If you need assistance with using TODO App, you can find answers to common questions below.
      </p>
      <h2 className="text-2xl font-bold mb-3">Frequently Asked Questions</h2>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">How do I create a new task?</h3>
        <p className="text-gray-700">
          To create a new task, click on the "Add TODO" button on the TODO screen. Fill in the task details and click "Submit" to add the task.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">How do I edit or delete a task?</h3>
        <p className="text-gray-700">
          To edit a task, click on the edit icon next to the task you want to modify. Update the task details and click "Submit" to save the changes.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">How do I mark a task as done?</h3>
        <p className="text-gray-700">
          To mark a task as done, click on the check icon next to the task. The task status will be updated to "Done".
        </p>
      </div>
      <h2 className="text-2xl font-bold mb-3">Contact Support</h2>
      <p className="text-gray-700">
        If you need further assistance, please contact our support team at support@todoapp.com.
      </p>
    </div>
  );
};

export default HelpScreen;
