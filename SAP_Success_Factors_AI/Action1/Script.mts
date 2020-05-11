﻿'===========================================================
'Function to Create a Random Number with DateTime Stamp
'===========================================================
Function fnRandomNumberWithDateTimeStamp()

'Find out the current date and time
Dim sDate : sDate = Day(Now)
Dim sMonth : sMonth = Month(Now)
Dim sYear : sYear = Year(Now)
Dim sHour : sHour = Hour(Now)
Dim sMinute : sMinute = Minute(Now)
Dim sSecond : sSecond = Second(Now)

'Create Random Number
fnRandomNumberWithDateTimeStamp = Int(sDate & sMonth & sYear & sHour & sMinute & sSecond)

End Function
'======================== End Function =====================

Dim UserName, FirstName, LastName, Email, FullName, Country

Browser("Browser").Navigate DataTable.GlobalSheet.GetParameter("URL")						'Navigate to the URL of SuccessFactors, driven off of the datasheet
AIUtil.SetContext Browser("Browser")														'Tell the AI SDK which window to work against
AIUtil("input", "Usernam.").Type DataTable.GlobalSheet.GetParameter("Username")				'Enter the User Name from the datasheet into the username field
AIUtil("text_box", "Enter Password").Type DataTable.GlobalSheet.GetParameter("Password")	'Enter the password fromt he datasheet into the Password field
AIUtil("button", "in").Click																'Click the Login button
AIUtil("down_triangle", micNoText, micFromLeft, 1).Click									'Click the down triangle for the menu
AIUtil.FindTextBlock("Recruiting").Click													'Click the Recruiting menu item
'AIUtil.FindTextBlock("Recruiting", micFromTop, 1).Click										'Click the Recruiting menu item
Browser("Browser").Page("SuccessFactors: Job Requisitio").WebTable("Job Requisition Summary").WaitProperty "visible",True, 3000	'Wait for the application to be ready to proceed, keying off of the Job Requisition data table, using traditional OR
AIUtil.FindTextBlock("Candidates", micFromTop, 1).Click										'Click the Candidates tab item at the top of the screen
Browser("Browser").Page("SuccessFactors: Candidates").WebElement("AddCandidatePlusButton").Click	'Click the Add Candidate button, AIUtil currently can't see the + button well
FirstName = "FN" & fnRandomNumberWithDateTimeStamp											'Create a unique first name
AIUtil("text_box", "First Name").Type FirstName												'Enter the first name into the First Name field
LastName = "LN" & fnRandomNumberWithDateTimeStamp											'Create a unique last name
AIUtil("text_box", "Last Name").Type LastName												'Enter the last name into the Last Name field
Email = "email" & fnRandomNumberWithDateTimeStamp & DataTable.GlobalSheet.GetParameter("EmailDomain")	'Create a unique e-mail address, using the e-mail domain in the data sheet
AIUtil("text_box", "Email:").Type Email														'Enter the e-mail into the e-mail address field
AIUtil("text_box", "Email Address").Type Email												'Enter the e-mail into the re-enter e-mail address field
Browser("Browser").Page("SuccessFactors: Candidates").WebElement("Country/Region:").Click	'AI SDK Currently doesn't have a scroll command, so leverage traditional OR to force the browser to scroll
AIUtil("text_box", "Phone").Type DataTable.GlobalSheet.GetParameter("PhoneNumber")			'Enter in a phone number into the phone number field from the data table
Country = DataTable.GlobalSheet.GetParameter("Country")										'Set the variable to be the value for Country from the data sheet
Browser("Browser").Page("SuccessFactors: Candidates").WebList("select").Select Country		'Select the Country with the value from the data sheet, new AI SDK ComboBox doesn't work on this particular combo box, use traditional OR @@ script infofile_;_ZIP::ssf4.xml_;_
AIUtil("button", "Create Profile").Click													'Click the Create Profile button
AIUtil.SetContext Browser("Candidate Profile")												'Tell the AI SDK to start working against the pop-up browser window
Browser("Candidate Profile").Maximize														'Maximize the pop-up browser window
AIUtil("button", "Cancel").Click															'Click the Cancel button to not upload a resume
AIUtil.FindTextBlock("+ Add", micFromTop, 1).Click											'Click the Add button to add internal job history
AIUtil("button", "Close Details").Click														'Change your mind, don't enter internal job history and slide down table
AIUtil("combobox", "Salutation").Select "Mr."												'Select the Mr. salutation
AIUtil.FindTextBlock("Save").Click															'Save changes in the candidate pop-up browser window
AIUtil.FindTextBlock("Close Window").Click													'Close the pop-up browser window with the Close Window text link
AIUtil.SetContext Browser("Browser")														'Tell the AI SDK to work against the initial window again
AIUtil.FindTextBlock("Basic Info V").Click													'Click the Basic Info drop down to be able to search by the name
AIUtil.FindTextBlock("First Name").Click													'Click the First Name in the drop down
AIUtil("text_box", "", micFromBottom, 1).Type FirstName										'Enter the same first name for the candidate created earlier
AIUtil("button", "", micFromTop, 3).Click													'Click the Search button
AIUtil("button", "Accept").Click															'Click the Accept button on the pop-up frame to accept search results
Browser("Browser").Page("SuccessFactors: Candidates").SAPUIButton("Account Navigation for").Click	'There isn't anything for AI to recognize for the user drop down, it's a picture of the person, use traditional OR @@ script infofile_;_ZIP::ssf5.xml_;_
AIUtil.FindTextBlock("Q) Log out").Click													'Click the Log out text in the drop down menu
Browser("Browser").Close																	'Close the browser

