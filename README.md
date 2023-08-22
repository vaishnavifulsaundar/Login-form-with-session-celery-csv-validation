# Login-form-with-session-celery-csv-validation

created login form with validation.
when user login then the session is store.
User doesnt have access to go to next page before login and only the users who have 
right credentials should be login successful otherwise it shows error.
After successful login there is file upload and it checks given file is csv or not.
If file is csv then it shows message that csv file is valid and if not then shows invalid csv file.
After csv validation if csv file is valid then only read data of gven csv.
After exporting data user have to plot highchart and GoJs chart.
Then in backend there is scheduling of task using Celery.
On UI side there is button called schedule with url of given file .

