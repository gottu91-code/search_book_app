const bookList = document.getElementById('book_list');
const searchBtn = document.getElementById('search_btn');
const input = document.getElementById('input');

// 検索
const search = async (inputValue) => {
    var res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${inputValue}`);
    var data = await res.json();
    let result = [];
    data.items.forEach((value) => {
        result.push({
            ttl: value.volumeInfo.title,
            link: value.volumeInfo.canonicalVolumeLink,
            description: value.volumeInfo.description,
            publish: value.volumeInfo.publishedDate,
        });
    });
    return result;
};

// 本リストを作成・表示
const creatList = async (inputValue) => {
    const result = await search(inputValue);
    result.forEach((value) => {
        const li = document.createElement('li');
        // タイトル設定
        const ttl = document.createElement('p');
        ttl.className = 'ttl';
        ttl.innerText = value.ttl;
        li.appendChild(ttl);
        // リンク設定
        const link = document.createElement('a');
        link.className = 'link';
        link.setAttribute('href',value.link);
        link.setAttribute('target','_blank');
        link.innerText = '本を買う';
        li.appendChild(link);
        // 説明文設定
        const description = document.createElement('p');
        description.className = 'description';
        description.innerText = value.description || '説明文が設定されていません';
        li.appendChild(description);
        // 発売日設定
        const publish = document.createElement('p');
        publish.className = 'publish';
        publish.innerText = `発売日: ${value.publish}`;
        li.appendChild(publish);
        
        bookList.appendChild(li);
    });
}

// 現在表示しているリストを削除
const allDelete = () => {
    while(bookList.firstChild) {
        bookList.removeChild(bookList.firstChild);
    };
}

// 検索開始
searchBtn.addEventListener('click',() => {
    allDelete();
    const inputValue = input.value;
    console.log('aaa');
    creatList(inputValue);
});





