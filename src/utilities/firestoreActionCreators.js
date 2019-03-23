import { loadingRequestStart, loadingRequestEnd } from '../store/actions/loadingRequestStatus';
import { getUid, getProfile } from '../store/selectors/auth';

export const addDocumentToFiresore = ({
  collection, requestId, successCallback, errorCallback
}) => {
  return data => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
      dispatch(loadingRequestStart(requestId));

      const firestore = getFirestore();

      const state = getState();

      const { firstName, lastName } = getProfile(state);
      
      const project = {
        title: data.title,
        content: data.content,
        createdAt: Date.now(),
        authorFirstName: firstName,
        authorLastName: lastName,
        authorId: getUid(state)
      };

      firestore.collection(collection).add(project)
      .then(() => {
        dispatch(loadingRequestEnd(requestId));

        dispatch(successCallback(data));
      })
      .catch(error => {
        dispatch(loadingRequestEnd(requestId));

        dispatch(errorCallback(error));
      })
    }
  }
};