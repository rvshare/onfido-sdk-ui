@browser
Feature: SDK File Upload Tests

  Scenario Outline: I should be able to upload a passport and an image of a face correctly.
    Given I verify with passport with <locale>
    When I try to upload passport <type>
    And I try to upload my selfie
    Then I should reach the complete step

    Examples:
      | type | locale |
      |      |        |
