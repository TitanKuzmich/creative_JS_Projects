const sendData = async (url, item) => {
    const formData = new FormData(item);
    let res = await fetch(url, {
        method: "POST",
        body: formData
    });

    return await res.json();
};

export {sendData};