import csv
from pymongo import MongoClient

client = MongoClient('mongodb+srv://m0hibsayed1393:BarterX@cluster0.hyssrie.mongodb.net/BarterX?retryWrites=true&w=majority')
db = client['BarterX']
ratings_collection = db['ratings']
products_collection = db['products']
users_collection = db['LoginInterface']

def ratings():
    data = [doc for doc in ratings_collection.find({}, {'_id': 0, '__v': 0,'userName': 0,'updatedAt': 0, 'createdAt': 0})]

    csv_file_path = 'ratings_data.csv'

    csv_header = ['user','product', 'rating', 'comment']

    with open(csv_file_path, 'w', newline='') as csv_file:
        csv_writer = csv.DictWriter(csv_file, fieldnames=csv_header)
        
        csv_writer.writeheader()
        
        csv_writer.writerows(data)

    print(f'CSV file created at: {csv_file_path}')

def users():
    data = [doc for doc in users_collection.find({}, {'__v': 0,'password': 0, 'Liked':0})]

    csv_file_path = 'users_data.csv'

    csv_header = ['_id','name', 'email', 'pincode']

    with open(csv_file_path, 'w', newline='') as csv_file:
        csv_writer = csv.DictWriter(csv_file, fieldnames=csv_header)
        
        csv_writer.writeheader()
        
        csv_writer.writerows(data)

    print(f'CSV file created at: {csv_file_path}')

def products():
    data = [doc for doc in products_collection.find({}, {'__v': 0,'likes': 0, 'sellerName':0,'tags':0, 'images':0})]

    csv_file_path = 'products_data.csv'

    csv_header = ['_id','prodname', 'desc', 'categ', 'condn', 'postedBy', 'desprodname','datepurchase']

    with open(csv_file_path, 'w', newline='') as csv_file:
        csv_writer = csv.DictWriter(csv_file, fieldnames=csv_header)
        
        csv_writer.writeheader()
        
        csv_writer.writerows(data)

    print(f'CSV file created at: {csv_file_path}')

# users()
products()