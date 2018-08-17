FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
#ENV http_proxy=http://10.8.5.222:3128
#ENV https_proxy=http://10.8.5.222:3128
RUN npm install
RUN npm install express --save
RUN npm install mongodb --save
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]

