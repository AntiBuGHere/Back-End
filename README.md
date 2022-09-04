## API link:- https://sehyog.herokuapp.com/
### Routes:-
#### /user
https://sehyog.herokuapp.com/user/signup
-post api

-req data = aadharno, email, password, cpassword, name

https://sehyog.herokuapp.com/user/signin
-post api

-req data = aadharno, password

https://sehyog.herokuapp.com/user/:aadharno
-get api

<br>

#### /medHistory
https://sehyog.herokuapp.com/medHistory/add
-post api

-req data = aadharno, name, prescriptions

https://sehyog.herokuapp.com/medHistory/:aadharno
-get api

<br>

#### /hospital
https://sehyog.herokuapp.com/hospital/signup
-post api

-req data = location, bedsAvailable, totalBeds, doctors, bed


https://sehyog.herokuapp.com/hospital/edit/:id
-post api

https://sehyog.herokuapp.com/hospital/delete/:id
-delete api

<br>

#### /doctor
https://sehyog.herokuapp.com/doctor/signup
-post api

-req data = aadharno, tags, desc, specialisation, name, password, cpassword 

https://sehyog.herokuapp.com/doctor/signin
-post api

-req data = aadharno, password 

https://sehyog.herokuapp.com/doctor/:aadharno
-get api
