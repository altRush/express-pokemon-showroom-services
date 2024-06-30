export enum HttpResponseMessage {
	ADD_SUCCESS = 'Pokemon is successfully added to the store',
	ADD_FAILED = 'Failed to add the Pokemon to the store',
	UPDATE_SUCCESS = 'Pokemon from the store is successfully updated',
	UPDATE_FAILED = 'Failed to update the pokemon in the store',
	GET_SUCCESS = 'Pokemon is successfully retrieved from the store',
	GET_FAIL = 'Failed to retrieve Pokemon from store',
	GET_UNKNOWN = 'Unknown Pokemon',
	GET_NOT_FOUND = 'Pokemon does not exist in store',
	DELETE_SUCCESS = 'Pokemon is successfully removed from the store',
	DELETE_FAILED = 'Failed to delete the pokemon from store',
	DELETE_FAILED_NAN = 'Failed to delete the pokemon from store (Pokemon ID is not number)',
	DELETE_NOT_FOUND = 'Pokemon ID does not exist in store'
}
