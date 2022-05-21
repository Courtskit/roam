# TODO: Roam (gp_hiking_and_camping_app)
### Contributors: 
- Courtney Smith
- Lyman Perrine
- Marcin Swaltek
- Phillip Hall
- Suruchi Khand

## App Summary:
**Updated: For hikers, backbackers and nomads planning their next adventure and private landowners wanting to extend the utility of their land, (Roam?) is a community website that connects private landowners with traveling adventurers looking for a simple site to stay at. Unlike other hiking or housing resource sites, this site will focus specifically on providing hikers/campers with the ability to find a place to stay that fits their budget needs and outdoor desires.**
- primary function is to post private land with any amount of resource/amentity from nothing (pure camping) to cabin with running water
- intent is for hikers/campers to have an alternative in addition to state/national parks to stay at that is cheap/free, simple and easy to coordinate

## Work Flow
### Getting Started:
1. Clone down repo
~~~
git clone https://github.com/quebecplatoon/gp_hiking_and_camping_app.git
~~~

2. Move into project directory, setup virtual environment, add database
~~~
python -m venv venv
source venv/bin/activate
createdb roam_db
~~~

3. Install django dependencies
~~~
cd backend/
pip install -r requirements.txt
python manage.py migrate
~~~
**Note: I have to use psycopg2-binary. If you typically use psycopg2 and its not already added to requirements.txt, also pip install that and add it to the requirements.txt (re-freeze to include on next merge to main)**
**Note2: You can ignore if you get a warning about the /frontend/build/static folder not existing. Doesnt impact and will be built later on**

4. Load data or create a super user
- I have an admin user created (username: admin, pw: admin, email: admin@admin.com) for us to all use but feel free to skip this and create your own super user
~~~
python manage.py loaddata data
~~~
#### OR
~~~
python manage.py createsuperuser
~~~

5. Install react dependencies
~~~
cd ../frontend/
npm install
~~~

6. Environment variables
- In the project root folder, we will create a .env file to hold any environment variables we dont want widely available to the internet (API keys, django secret key, etc). These details will be passed via slack if needed. Use the .env-example to create a .env file and add/paste in whatever values are needed
~~~
cd gp_hiking_and_camping_app
touch .env
~~~

7. Test that it all works
- From gp_hiking_and_camping_app/backend
~~~
python manage.py runserver
~~~
- From gp_hiking_and_camping_app/frontend
~~~
npm start
~~~

### Project Contributions after initial setup on local
1. In project root folder (gp_hiking_and_camping_app) git pull from main to gather all updates
~~~
git pull
~~~
2. Create a new branch to do some work in
~~~
git checkout -b some_new_branch
~~~
3. Write your code, test and commit 
4. Push branch to github
~~~
git push origin some_new_branch
~~~
5. Peer review updates locally or on another's computer to test merges to main or updates to another function (preferred to peer review with the specific developer(s) whose code/function will be updated)
6. Merge changes into main, again preferred peer review with developers whose code will change to resolve conflicts during merge
~~~
git checkout main
git merge some_new_branch
git push origin main
~~~
7. If completely sure this branch not needed again or will be needed to revert back to, delete the branch
~~~
git branch -D some_new_branch
git push origin -d some_new_branch
~~~

### Development with this project setup
1. Separate development with hot reload updates:
- With two terminals:
    a) ensure that your .env react url route for API calls to django is reflected
    ~~~
    REACT_APP_URL_PREFIX=http://localhost:8000/api/
    ~~~
    b) in ./backend/
    ~~~
    python manage.py runserver
    ~~~
    c) in ./frontend/
    ~~~
    npm start
    ~~~
    d) Use localhost:3000 for front end dev, localhost:8000/api/ and localhost:8000/admin for back end management

**This needs some tweaking**
2. To develop/test in deployment type environment
- with two separate terminals
    a) set the .env url route to blank
    ~~~
    REACT_APP_URL_PREFIX=
    ~~~
    b) in ./frontend/
    ~~~
    npm run build
    npm run watch
    ~~~
    c) in ./backend/
    ~~~
    python manage.py runserver
    ~~~
    d) site should show up on localhost:8000

