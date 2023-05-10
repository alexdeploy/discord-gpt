const { describe, it, expect } = require('@jest/globals');
const { moderationCheck } = require('../src/utils/security');

describe('Security check:', () => {

    const response = {
        data: {
            "id": "modr-XXXXX",
            "model": "text-moderation-001",
            "results": [
              {
                "categories": {
                  "hate": false,
                  "hate/threatening": false,
                  "self-harm": false,
                  "sexual": false,
                  "sexual/minors": false,
                  "violence": false,
                  "violence/graphic": false
                },
                "category_scores": {
                  "hate": 0.18805529177188873,
                  "hate/threatening": 0.0001250059431185946,
                  "self-harm": 0.0003706029092427343,
                  "sexual": 0.0008735615410842001,
                  "sexual/minors": 0.0007470346172340214,
                  "violence": 0.0041268812492489815,
                  "violence/graphic": 0.00023186142789199948
                },
                "flagged": false
              }
            ]
          }
        }

    it('should return true only if all categories are false', async () => {

        const result = await moderationCheck(response.data);
        expect(result).toBe(true);
    });

    it('should return false if any category is true', async () => {
        response.data.results[0].categories.hate = true;
        const result = await moderationCheck(response.data);
        expect(result).toBe(false);
    });
});