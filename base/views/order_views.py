from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import OrderSerializer
from rest_framework import status
from datetime import datetime
from base.paginator import getPaginatedItems



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    order_items = data['orderItems']
    if order_items and len(order_items) == 0:
        return Response({'detail':'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user = user,
            payment_method = data['paymentMethod'],
            tax_price = data['taxPrice'],
            shipping_price = data['shippingPrice'],
            total_price = data['totalPrice']
        )

        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            state = data['shippingAddress']['state'],
            postal_code = data['shippingAddress']['postalCode'],
        )

        for i in order_items:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                image = product.image.url,
            )

            product.count_in_stock = int(product.count_in_stock) - int(item.qty)
            product.save()
            
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all().order_by('-created_at')
    paginate_results = getPaginatedItems(request, orders, 6)
    serializer = OrderSerializer(paginate_results[0], many=True)
    return Response({'orders': serializer.data, 'page': paginate_results[1], 'pages': paginate_results[2]})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authorized to view this order'}, status = status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order does not exist'}, status = status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)
    order.is_paid = True
    order.paid_at = datetime.now()
    order.save()
    return Response('Order was paid')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)
    order.is_delivered = True
    order.delivered_at = datetime.now()
    order.save()
    return Response('Order was delivered')