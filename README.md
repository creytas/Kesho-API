# Kesho-API
the application programming interface of the nutritional center Kesho Congo <br/>https://kesho-api.onrender.com/api-docs<br/>
## Build with
this application has been realized with the help of the following technologies<br/>
<img src="https://miro.medium.com/v2/resize:fit:736/1*3bMcQcLAE-fPjVEhnY5xsQ.png" alt="node, sequelize and mysql"/>  

## Description
<p>
<strong>Kesho Congo</strong> is a social action dealing with the care of <strong>malnourished children</strong>. Thanks to this application programming interface, it can <strong>manage</strong> and <strong>make available data in real time</strong> in order to exploit them via software and other tools.
</p>

## Main features
- visualize the general status of the patients and stocks of the nutritional center
- register patients when they first enter the center
- consult the patient by taking his anthropometric parameters
- draw up a health map of the patient showing graphically his evolution as well as a history of consultations
- edit various patient information
- see the operations carried out on the raw material stock of the center
- see current stock status
- record a transaction on stock

## Install
To get the project running locally on your machine you need to have the following development tools installed:<br/>
- NodeJS and npm
- MySQL
- Git

1. Clone the project:

```
git clone https://github.com/creytas/Kesho-API.git && cd Kesho-API
```

2. Install Node.JS packages via npm. Do you want to use yarn instead? Use `npm install --global yarn`.<br/>
Launch &nbsp;
`
npm install
`
or
`
yarn install
`
3. Add the environmental variables that will be used in the process: 
```
JWT_SECRET = <your_jwt_secret>
SENDGRID_API_KEY = <your_sendgrid_api_key>
SENDGRID_SENDER = <your_sendgrid_sender>
MAILNAME = <your_sendgrid_mail_account>
PASSMAIL = <your_sendgrid_account_password>

CLOUDINARY_URL = <your_cloudinary_url>
CLOUDINARY_API_KEY = <your_cloudinary_api_key>
CLOUDINARY_API_SECRET = <your_cloudinary_api_secret>
CLOUDINARY_API_NAME = <your_cloudinary_api_name>

NODE_ENV = development
PORTLOCAL = 4000
DB_HOSTLOCAL = <localhost or 127.0.0.1>
DB_USERLOCAL = <root or your_mysql_username>
DB_PASSLOCAL = <"" or your_mysql_password>
DB_NAMELOCAL = kesho_db
DB_PORTLOCAL = 3306
DB_CHARSETLOCAL = utf8
DB_CONNECTION_LIMITLOCAL = 10
DB_CONNECTION_TIMEOUTLOCAL = 100000
```
5. Run the project. <br/>
Launch &nbsp;
`
npm start
`
or
`
yarn start
`
