from settings import app, db
from databse import Items, Bill_items, Bills
from flask import jsonify, request, render_template, redirect, url_for
from datetime import datetime


@app.route('/api/items', methods=['GET'])
def send_items():
    items = Items.query.all()
    data = {'items': []}

    for item in items:
        data['items'].append(
            [item.id, item.item, item.price]
        )

    print(data)

    return jsonify(data)


@app.route('/api/new_item', methods=['POST'])
def get_items():
    data = request.json
    item = data['name']
    price = data['price']
    db.session.add(
        Items(
            item=item,
            price=price
        )
    )
    db.session.commit()
    return 'hi'


@app.route('/api/delete_item', methods=['POST'])
def delete_item():
    print(int(request.json['id']))
    db.session.delete(
        Items.query.filter_by(id=int(request.json['id'])).first()
    )
    db.session.commit()

    return 'hi'


@app.route('/api/edit_item', methods=['POST'])
def edit_item():
    data = request.json
    item = Items.query.filter_by(id=data['id']).first()
    item.item = data['name']
    item.price = data['price']
    db.session.commit()

    return 'hi'


@app.route('/api/save_bill', methods=['POST'])
def save_bill():
    data = request.json
    details = data['details']
    data_list = data['data_list']

    date = datetime.now()

    db.session.add(
        Bills(
            name=details['name'],
            phone=details['phone_number'],
            created_at=date
        )
    )
    db.session.commit()

    bill_id = Bills.query.filter_by(created_at=date).first().id

    for info in data_list:
        db.session.add(
            Bill_items(
                bill_id=bill_id,
                item_id=info['id'],
                quantity=info['quantity']
            )
        )
    db.session.commit()

    return 'hi'


@app.route('/api/recent_bills', methods=['GET'])
def recent_bills():
    unstructured_bills = Bill_items.query.all()
    bill_ids = []

    for unstructured_bill in reversed(unstructured_bills):
        bill = Bills.query.filter_by(id=unstructured_bill.bill_id).first()
        bill_id = bill.id
        bill_ids.append(bill_id)
    bill_ids = set(bill_ids)
    bill_ids = list(bill_ids)

    each_items_list = []
    for bill_id in reversed(bill_ids):
        bill_items = Bill_items.query.filter_by(bill_id=bill_id)

        items_dict = {}
        details = Bills.query.filter_by(id=bill_id).first()

        details_dict = {
            'id': details.id,
            'name': details.name,
            'phone': details.phone,
            'createdAt': details.created_at
        }

        items_dict['details'] = details_dict

        items_list = []
        for item in bill_items:
            try:
                items = Items.query.filter_by(id=item.item_id).first()
                items_list.append({
                    'id': items.id,
                    'item': items.item,
                    'price': items.price,
                    'quantity': item.quantity
                })
            except:
                continue

        items_dict['itemsList'] = items_list

        each_items_list.append(items_dict)

    return jsonify(each_items_list)


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)
