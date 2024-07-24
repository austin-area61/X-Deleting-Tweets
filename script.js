// Function to create a delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function to simulate deleting tweets
async function deleteTweets() {
  // Select all delete buttons for tweets
  // The exact selector will depend on the website's structure
  const deleteButtons = document.querySelectorAll('div[data-testid="caret"]'); // Twitter's more options button

  // Loop through the list of delete buttons
  for (let i = 0; i < deleteButtons.length; i++) {
    // After every 5 deletions, wait for an hour
    if (i % 5 === 0 && i !== 0) {
      console.log('Waiting for an hour before deleting more tweets...');
      await sleep(3600 * 1000); // Wait for 1 hour (3600 seconds)
    }

    // Click the more options button to reveal the delete option
    deleteButtons[i].click();
    await sleep(1000); // Wait for the options to appear

    // Select the delete button from the options
    const confirmDeleteButton = document.querySelector('div[role="menuitem"]:contains("Delete")');
    if (confirmDeleteButton) {
      confirmDeleteButton.click();
      await sleep(1000); // Wait for the confirmation dialog to appear

      // Confirm the deletion
      const finalDeleteButton = document.querySelector('div[data-testid="confirmationSheetConfirm"]');
      if (finalDeleteButton) {
        finalDeleteButton.click();
        console.log(`Deleted tweet ${i + 1}`);
      }
    }

    // Wait for a few seconds between each deletion to mimic human behavior
    await sleep(5000); // Wait for 5 seconds
  }

  console.log('All selected tweets have been deleted.');
}

// Execute the main function
deleteTweets();
