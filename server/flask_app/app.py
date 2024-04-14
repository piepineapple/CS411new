from flask import Flask, request, jsonify
import os
#from flask_mongoengine import MongoEngine

app = Flask(__name__)

#app.config['MONGODB_SETTINGS'] = {
#    'host': os.environ.get('MONGODB_URI', 'mongodb://localhost/database')
#}
#db = MongoEngine(app)

@app.route('/process_journal', methods=['POST'])
def process_journal():
    # Handle the POST request here
    return jsonify({'message': 'Success'})

@app.route('/')
def index():
    return jsonify({"message": "hello"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=port)
