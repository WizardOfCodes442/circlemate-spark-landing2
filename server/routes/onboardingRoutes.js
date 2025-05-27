// routes/onboardingRoutes.js
const express = require('express');
const onboardingController = require('../controllers/onboardingController');
const { authenticate } = require('./middleware');
const { 
    validateCommunitySelection,
    validateProfileUpdate,
    validateLocation,
    validatePersonality,
    validatePreferences,
    validateAvailability
} = require('../utils/onboardingValidation');

const router = express.Router();

// All onboarding routes require authentication
router.use(authenticate);

// Get onboarding status
router.get('/status', onboardingController.getOnboardingStatus);

// Get available communities
router.get('/communities', onboardingController.getCommunities);

// Step 1: Community selection
router.post('/community', validateCommunitySelection, onboardingController.selectCommunity);

// Step 2: Profile information
router.post('/profile', validateProfileUpdate, onboardingController.updateProfile);

// Step 3: Location
router.post('/location', validateLocation, onboardingController.updateLocation);

// Step 4: Personality traits
router.post('/personality', validatePersonality, onboardingController.updatePersonality);

// Step 5: Preferences
router.post('/preferences', validatePreferences, onboardingController.updatePreferences);

// Step 6: Availability
router.post('/availability', validateAvailability, onboardingController.updateAvailability);

// Step 7: Photo upload
router.post('/photos', onboardingController.uploadPhotos);
router.delete('/photos/:photoId', onboardingController.deletePhoto);

// Complete onboarding
router.post('/complete', onboardingController.completeOnboarding);

module.exports = router;