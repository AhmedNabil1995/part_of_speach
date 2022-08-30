# Part_Of_Speach Application

### this is an app for english students to help them categorized words according to their syntactic functions, which is known as "Part of Speech".
Examples of part of speech: (noun, verb, adjective, ...)

## first how to Setup this App
after you download client and server folders open them in vs code then.

* open a new terminal and write these code to install all packages used in this APP
```
cd client
npm i
npm start
```
```
cd server
npm i
npm start
```
now your app is ready to use, and if there is any problem with some packages that aren't installed, you can install it manually
for client-side there is two packages are used besides react
* react-router
* axios
```
npm install react-router-dom@6 axios
```

for server-side there is three packages are installed
* express
* dotenv
* cors
```
npm install express dotenv cors
```




## this app consist of 4 screens

#### 1. Start Quiz Screen
#### 2. Rules Screen
#### 3. Quesions Screen
#### 4. Result Screen

## Start Screen
##### this Screen has only one button that if you click on it,that will open the Rules Screen
<img src="https://user-images.githubusercontent.com/108214255/187409162-ce634f43-9789-4029-8115-51368caef5c5.png" width="400">

## Rules Screen

##### Read this screen curefully

<img src="https://user-images.githubusercontent.com/108214255/187409552-726a15e9-1a59-44bc-ba71-d3efe57e36b8.png" width="400">

## Quesion Screen

this Screen is the main Screen
it has the most features in this app
first you can see a timer that count from 10 to 0, 
a quesion with 4 answer,
a progress bar that shows your progress, and below you can see which question you are in now and a button that allow you to go to next quesion
+ For every question, you must choose one answer before the timer goes off (see picture 1)
+ if your answer is correct, it feedbacks you that you chose the correct answer (see picture 2), and the next button will appear
+ if your answer is not correct, it feedbacks you that you chose a wrong answer (see picture 3), and the next button will appear
+ if the time goes off you can,t choose any answer (see picture 4), and the next button will appear


<div>
<img src="https://user-images.githubusercontent.com/108214255/187409625-b4527623-f98a-460f-9a93-68543fab9ef8.png" width="400" height="282">
<img src="https://user-images.githubusercontent.com/108214255/187409678-70a6b963-5020-4d31-a989-8b3e30ba0ecc.png" width="400">
<img src="https://user-images.githubusercontent.com/108214255/187409738-c07753e6-e1fc-4fc2-a3c9-24530fe7bfc9.png" width="400">
<img src="https://user-images.githubusercontent.com/108214255/187409777-769cb8ff-1750-4bbb-8ee4-1cd4baeea44f.png" width="400">
</div>

## Result Screen

#### the final result of your test
<img src="https://user-images.githubusercontent.com/108214255/187409822-ee3fe956-3cc7-49f2-847e-be2851906e98.png" width="400">

