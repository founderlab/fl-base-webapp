// Tell babel to include FounderLab packages (starting with fl-)
require('babel/register')({ignore: /node_modules\/(?!fl-)/})
require('./server/app')