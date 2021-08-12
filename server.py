import os, cherrypy
os.chdir(os.path.dirname(os.path.realpath(__file__)))

class Website(object):
	def read_file(self, filename):
		with open(filename, encoding = "utf-8") as f:
			content = f.read()
		return content

	@cherrypy.expose
	def index(self):
		return self.read_file("content/index/index.html")

print(os.getcwd())

config = {
	"global": {
		"server.socket_host": "0.0.0.0",
		"server.socket_port": 80
	},
	"/": {
		"tools.staticdir.root": os.path.join(os.path.abspath(os.getcwd()), "content"),
		"tools.staticdir.on": True,
		"tools.staticdir.dir": "."
	}
}

cherrypy.quickstart(Website(), config = config)