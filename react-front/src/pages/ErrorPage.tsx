import { useRouteError } from 'react-router-dom';

import PageContent from '../components/elements/PageContent';

//ErrorPage component, displays an error message if there is an error
function ErrorPage() {
    const error = useRouteError() as any;

    console.log(error);

    let title = 'An error occurred!';
    let message = 'Something went wrong!';

    if (error.status === 500) {
        message = error.data.message;
    }

    if (error.message === 'useWebSocket must be used within a WebSocketProvider') {
        return
    }

    if (error.status === 404) {
        title = 'Not found!';
        message = 'Could not find resource or page.';
    }

    return (
        <>
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    );
}

export default ErrorPage;
