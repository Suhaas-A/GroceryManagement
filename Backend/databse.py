from settings import db


class Items(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(500))
    price = db.Column(db.Integer)


class Bills(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    created_at = db.Column(db.DateTime)
    phone = db.Column(db.String(10))


class Bill_items(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bill_id = db.Column(db.Integer)
    item_id = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
