const express = require('express');
const router = express.Router();
const waitlistController = require('../controllers/waitListController');
// Public route - Submit to waitlist
router.post('/submit', waitlistController.submitWaitlist);

// Protected routes - Admin only

// Get waitlist entries
router.get('/', waitlistController.getWaitlist);

// Export as CSV
router.get('/export', waitlistController.exportWaitlist);

// Get statistics
router.get('/stats', waitlistController.getWaitlistStats);

// Update entry status
router.patch('/:id/status', waitlistController.updateWaitlistStatus);

// Delete entry
router.delete('/:id', waitlistController.deleteWaitlistEntry);

module.exports = router;