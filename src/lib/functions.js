export function getName(name) {
    var result;
    switch ((name.trim())) {
        case 'product':
            result = 'Продукт';
            break;
        case 'code':
            result = 'Код';
            break;
        case 'comment':
            result = 'Коментар UA';
            break;
        case 'comment_ru':
            result = 'Коментар RU';
            break;
        case 'comment_no_front':
            result = 'Значенння';
            break;
        case 'priority':
            result = 'Пріорітет';
            break;
        case 'fl_autodec':
            result = 'Авто';
            break;
        default:
            result = name;
            break;
    }
    return result;
}