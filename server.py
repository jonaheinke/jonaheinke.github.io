import os, cherrypy
os.chdir(os.path.dirname(os.path.realpath(__file__)))

class Website(object):
	def read_file(self, filename):
		with open(filename, encoding = "utf-8") as f:
			content = f.read()
		return content

	@cherrypy.expose
	def index(self):
		return self.read_file("index.html")

config = {
	"global": {
		"server.socket_host": "0.0.0.0",
		"server.socket_port": 80
	},
	"/": {
		"tools.staticdir.root": os.path.abspath(os.getcwd()),
		"tools.staticdir.on": True,
		"tools.staticdir.dir": "."
	}
}

cherrypy.quickstart(Website(), config = config)