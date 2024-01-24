from django.shortcuts import render
from django.db.models import F
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.paginator import getPaginatedItems
from base.models import Product, Review, OrderItem
from base.serializers import ProductSerializer
from rest_framework import status
import urllib.parse


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    products = Product.objects.filter(name__icontains=query).order_by('-created_at')
    paginate_results = getPaginatedItems(request, products, 8)
    serializer = ProductSerializer(paginate_results[0], many=True)
    return Response({'products': serializer.data, 'page': paginate_results[1], 'pages': paginate_results[2]})


@api_view(['GET'])
def getProductsByCategory(request):
    query_cat = request.query_params.get('category')
    if query_cat:
        if (query_cat != 'all' or query_cat != None):
            query = urllib.parse.unquote(query_cat)
            products = Product.objects.filter(category=query).order_by('-created_at') 
    else:
        products = Product.objects.all().order_by('-created_at')
    paginate_results = getPaginatedItems(request, products, 8)
    serializer = ProductSerializer(paginate_results[0], many=True)
    return Response({'products': serializer.data, 'page': paginate_results[1], 'pages': paginate_results[2]})


@api_view(['GET'])
def getProductInfo(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        count_in_stock=0,
        category='Sample Category',
        description=''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.count_in_stock = data['count_in_stock']
    product.category = data['category']
    product.description = data['description']
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Producted Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # Verify if product was purchased by user
    user_ordered_items = OrderItem.objects.filter(order__user=user, order__is_paid=True).values_list('name', flat=True)
    user_order_list = list(user_ordered_items)
    # Verify if user already submitted a review for the product
    alreadyExists = product.review_set.filter(user=user).exists()
    # Review exists
    if alreadyExists:
        content = {'detail': 'Product was already reviewed by you'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # No product purchase by the user
    elif str(product) not in user_order_list:
        content = {'detail': 'Product must be purchased prior to writing a review'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )
        # review.save()
        reviews = product.review_set.all()
        product.num_reviews = len(reviews)
        total = 0
        for i in reviews:
            total += i.rating
        product.rating = total / len(reviews)
        product.save()
        return Response('Review Added')
    
