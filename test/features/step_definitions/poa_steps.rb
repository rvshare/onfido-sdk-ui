require_relative '../helpers/i18n_helper.rb'

i18n = I18nHelper.new

Given(/^I navigate to the SDK with PoA feature enabled$/) do
  open_sdk(@driver, { 'poa' => true, 'useWebcam' => false })
end

When(/^I navigate to poa document upload screen after selecting(?: (.+)?)?$/) do |poa_document|

  steps %Q{
    When I click on primary_button (SDK)
    When I click on start_verification_button (POA)
    When I click on #{poa_document} (POA)
    When I click on continue_button (POA)

  }
end

When(/^I navigate to poa document upload intro screen after selecting(?: (.+)?)?$/) do |poa_document|

  steps %Q{
    When I click on primary_button (SDK)
    When I click on start_verification_button (POA)
    Then I should see document_selection_screen_title (POA)
    Then I should see document_selection_screen_subtitle (POA)
    When I click on #{poa_document} (POA)
  }
end
