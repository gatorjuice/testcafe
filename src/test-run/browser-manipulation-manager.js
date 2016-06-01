import uuid from 'uuid';


const SCREENSHOT_CAN_NOT_BE_CREATED_MESSAGE = '[was unable to take a screenshot due to some error]';


export default class BrowserManipulationManager {
    constructor (screenshotCapturer) {
        this.screenshotCapturer = screenshotCapturer;
    }

    async takeScreenshot (windowId, customPath) {
        try {
            return await this.screenshotCapturer.captureAction(
                windowId,
                { stepName: uuid.v4(), customPath: customPath }
            );
        }
        catch (e) {
            // NOTE: swallow the error silently if we can't take screenshots for some
            // reason (e.g. we don't have permissions to write a screenshot file).
            return SCREENSHOT_CAN_NOT_BE_CREATED_MESSAGE;
        }
    }

    async takeScreenshotOnFail (windowId) {
        try {
            return await this.screenshotCapturer.captureError(
                windowId,
                { stepName: uuid.v4(), screenshotRequired: true }
            );
        }
        catch (e) {
            // NOTE: swallow the error silently if we can't take screenshots for some
            // reason (e.g. we don't have permissions to write a screenshot file).
            return SCREENSHOT_CAN_NOT_BE_CREATED_MESSAGE;
        }
    }
}