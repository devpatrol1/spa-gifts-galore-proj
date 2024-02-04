from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


def getPaginatedItems(request, items, num):
    page = request.query_params.get('page')
    paginator = Paginator(items, num)
    try:
        items = paginator.page(page)
    except PageNotAnInteger:
        items = paginator.page(1)
    except EmptyPage:
        items = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    page = int(page)
    
    return items, page, paginator.num_pages