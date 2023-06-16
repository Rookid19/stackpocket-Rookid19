export async function db_registerSeller({ email, busines_name, phone, national_id, national_id_type,uid }: RegisterSeller) {
    const documentRef = doc(db, "users", email, "profile", uid);
    const documentRef1 = doc(db, "users", email, "seller", "details");
    const Phone = phone[0] === '0' ? phone.substring(1) : phone
    const field = { "metaData.isMerchant": true }
    await setDoc(documentRef1, {
        busines_name,
        phone: '+234' + Phone,
        timestamp: serverTimestamp(),
        national_id_type,
        national_id
    }).then(async () => {
        await updateField(field, documentRef).finally(() => {
            // do something here
            alert("Seller registered successfully")
        })
    }).catch(error => alert(error))
}
