import { collection, onSnapshot, query, serverTimestamp, setDoc, doc, getDoc, DocumentReference, DocumentData, where, getDocs } from "firebase/firestore";
import db from ".";
import { Register, ValidateType } from "@/interface/interface";
import { ValidateUser } from "@/utils/validate";
import toast from 'react-hot-toast';
/**
 * Checks if a document exists in Firestore.
 * @param documentRef - The reference to the document.
 * @returns A promise that resolves to a boolean indicating whether the document exists.
 */
export const checkDocumentExists: (documentRef: DocumentReference<DocumentData>) => Promise<boolean> = async (documentRef) => {
    const documentSnapshot = await getDoc(documentRef);
    return documentSnapshot.exists();
};

/**
 * Sign in a user by comparing the email and password with Firestore documents.
 * @param dispatch - The Redux dispatch function.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns An unsubscribe function to stop listening to Firestore changes.
 */
export async function db_signInUser<T extends Register>({ email, password }: T) {

    const mainData: Object[] = []

    try {
        const documentRef = query(collection(db, 'users', email.toLowerCase(), 'Profile'),
         where('password', '==', password),
          where('email', '==', email.toLowerCase()));
        const querySnapshot = await getDocs(documentRef);
        querySnapshot.forEach((doc:any) => {
            mainData.push(doc.data())
        });
        console.log('from firebase:', mainData)
        if (mainData.length > 0) {
            return mainData[0];
        }
    } catch (error) {
        console.log('Unable to Perform request ');
    }
}



/**
 * Register a new user in Firestore.
 * @param email - The email of the user.
 * @param phone - The phone number of the user.
 * @param password - The password of the user.
 * @param name - The name of the user.
 */


export async function db_registerUser({ name, email, password, phone, confirmPassword, setSuccess, setLoading, setMessage, setIsMessage }: Register) {
    setLoading(true);
    const errorsValidation: any = ValidateUser({
        email,
        password,
        confirmPassword,
        phone,
        name,
    }) as ValidateType

    Object.keys(errorsValidation).forEach((key) => {
        if (errorsValidation[key]) {
          toast.error(errorsValidation[key]);
        }
    })


    if (Object.values(errorsValidation).length === 0) {
        const documentRef = doc(db, "users", email, "Profile", "details");
        const validation = await checkDocumentExists(documentRef);
        const Phone = phone[0] === '0' ? phone.substring(1) : phone
        if (!validation) {
            await setDoc(documentRef, {
                name,
                email,
                password,
                phone : '+234' + Phone,
                metaData: {
                    timestamp: serverTimestamp(),
                    isVerified: false,
                    isMerchant: false,
                }
            }).then(() => {
                setSuccess(true);
                setLoading(false);
                setMessage("User registered successfully");
            });
        } else {
            setIsMessage(true);
            setLoading(false);
            setMessage("User already exists");
        }
    } else {
        setLoading(false);

    }
}
