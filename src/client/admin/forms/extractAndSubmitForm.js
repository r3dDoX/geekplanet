export default function extractAndSubmitForm(submitFunction, form) {
  return submitFunction(new FormData(form))
    .then(() => form.reset());
}
