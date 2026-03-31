ALTER TABLE "promo_codes"
ADD CONSTRAINT "promo_codes_discount_percent_check"
CHECK ("discountPercent" >= 1 AND "discountPercent" <= 100);

ALTER TABLE "promo_codes"
ADD CONSTRAINT "promo_codes_activation_limit_check"
CHECK ("activationLimit" >= 1);

ALTER TABLE "promo_codes"
ADD CONSTRAINT "promo_codes_activation_count_check"
CHECK ("activationCount" >= 0);

ALTER TABLE "promo_codes"
ADD CONSTRAINT "promo_codes_activation_count_limit_check"
CHECK ("activationCount" <= "activationLimit");
