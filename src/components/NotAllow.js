import React from "react";
import {Container} from "react-bootstrap";

function NotAllow() {
    return (
        <Container>
            <h1>На жаль, у Вас немає доступу до даної сторінки!</h1>
            <p>Зверніться до адміністратора для уточнення необхідних ролей!</p>
        </Container>
    );
}

export default NotAllow;