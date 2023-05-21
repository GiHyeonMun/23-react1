import Card from "./Card";

function ProfileCard(props) {
    return (
        <Card title="Mark Mun" backgroundColor="#4ea04e">
            <p>안녕하십니까, 마크입니다</p>
            <p>저는 리액트를 사용하면서 개발하고 있습니다</p>
        </Card>
    );
}

export default ProfileCard;