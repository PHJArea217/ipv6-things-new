const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const endpoint = require('./universal-relay/endpoint.js');
const i6t_template = String(fs.readFileSync('i6t_default.ejs'));
var app = express();
app.use('/', function (req, res) {
	let ep_local = endpoint.ofLocal(req.socket);
	let ep_remote = endpoint.ofRemote(req.socket);
	let i6t_template_locals = {
		color: null,
		textColor: '#000',
		remoteIP: ep_remote.getIPString(),
		auxtext: null,
		auxtext1: null,
		auxtext2: null,
		hasStatic: null,
		randomLinks: [['ip', 'IPv6 address']],
		domain_: "",
		homepage: "ipv6-things.com",
		ipAddress: ep_local.getIPString(),
		title: null
	};
	let ejs_render_result = ejs.render(i6t_template, i6t_template_locals);
	res.status(200).send(ejs_render_result);
});
app.listen({host: '::', port: 80});
