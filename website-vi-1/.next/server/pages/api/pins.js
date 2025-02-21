"use strict";(()=>{var e={};e.id=271,e.ids=[271],e.modules={6037:e=>{e.exports=require("mongoose")},5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6762:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},9738:(e,t,n)=>{n.r(t),n.d(t,{config:()=>m,default:()=>p,routeModule:()=>P});var o={};n.r(o),n.d(o,{default:()=>g});var r=n(9947),a=n(325),i=n(6762),s=n(648);let c=require("mongodb");var l=n(6037),d=n.n(l);let u=new(d()).Schema({_id:c.ObjectId,lat:{type:Number,required:!0},lng:{type:Number,required:!0},createdAt:{type:Date,default:Date.now,expires:86400}}),f=d().models.Pin||d().model("Pin",u);async function g(e,t){if(await (0,s.$V)(),"POST"===e.method)try{let{lat:n,lng:o}=e.body,r=new f({lat:n,lng:o});await r.save(),t.status(201).json({message:"Pin saved!",pin:r})}catch(e){console.error("Error saving pin:",e),t.status(500).json({message:"Failed to save pin"})}else if("GET"===e.method)try{let e=await f.find({});t.status(200).json(e)}catch(e){console.error("Error fetching pins:",e),t.status(500).json({message:"Failed to fetch pins"})}else if("DELETE"===e.method)try{let{_id:n}=e.body;if(!n)return t.status(400).json({message:"Missing pin ID"});let o=await f.findByIdAndDelete(n);if(!o)return t.status(404).json({message:"Pin not found"});t.status(200).json({message:"Pin deleted successfully",deletedPin:o})}catch(e){console.error("Error deleting pin:",e),t.status(500).json({message:"Failed to delete pin"})}else t.status(405).json({message:"Method not allowed"})}let p=(0,i.M)(o,"default"),m=(0,i.M)(o,"config"),P=new r.PagesAPIRouteModule({definition:{kind:a.A.PAGES_API,page:"/api/pins",pathname:"/api/pins",bundlePath:"",filename:""},userland:o})},648:(e,t,n)=>{n.d(t,{$V:()=>i,R9:()=>s,RR:()=>c});var o=n(6037),r=n.n(o);let a=null,i=async()=>{if(a)return a;try{return console.log("Attempting to connect to MongoDB..."),await r().connect(process.env.MONGODB_URI),console.log("Successfully connected to MongoDB!"),a=r().connection,console.log("Connected to MongoDB:",1===r().connection.readyState),a}catch(e){throw console.error("Error connecting to MongoDB:",e),Error("Failed to connect to MongoDB")}},s=async()=>{try{let e=await i();if(!e.db)throw Error("Database connection failed: db.db is undefined");return(await e.db.listCollections().toArray()).map(e=>e.name)}catch(e){throw console.error("Error getting collections:",e),Error("Failed to get collections")}},c=async e=>{try{let t=await i();if(!t.db)throw Error("Database connection failed: db.db is undefined");let n=t.db.collection(e);return await n.find({}).toArray()}catch(e){throw console.error("Error fetching collection data:",e),Error("Failed to fetch collection data")}}},325:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return n}});var n=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},9947:(e,t,n)=>{e.exports=n(5600)}};var t=require("../../webpack-api-runtime.js");t.C(e);var n=t(t.s=9738);module.exports=n})();