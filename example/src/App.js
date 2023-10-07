import React, {
    Fragment
} from 'react';
import {
    Article,
    Button,
    Footer,
    Header,
    ListItem,
    Main,
    OrderedList,
    Section,
    Spinner,
    SplitButton,
    UnorderedList,
    Tooltip,
} from '@muckington/react-components';

const App = () => {

    return <Fragment>

        <Header>

            <Tooltip
                text={'Example heading tooltip'}
            >
                <h1>ThugNerdz&apos; React Components Example</h1>
            </Tooltip>

            <p>Date: {new Date().toDateString()}</p>

        </Header>

        <Main>

            <Section>


                <h2>Section component</h2>

                <Article>

                    <h3>Article component</h3>

                    <UnorderedList>

                        <Tooltip
                            text={'Example unordered list tooltip'}
                        >
                            <h4>UnorderedList</h4>
                        </Tooltip>

                        <ListItem>

                            <h5>List item #1</h5>

                            <p>Lorem ipsum...</p>

                            <Button
                                disabled={true}
                            >
                                Disabled button
                            </Button>

                            <SplitButton
                                splitButtonProps={{
                                    title: 'Split button options',
                                    type: 'button',
                                    status: 'primary',

                                }}
                                menuItems={[
                                    {
                                        title: 'Option #1',
                                        type: 'button',
                                        children: 'Option #1',
                                        status: 'warning',
                                    },
                                    {
                                        title: 'Option #2',
                                        type: 'button',
                                        children: 'Option #2',
                                        disabled: true,
                                        status: 'success',
                                    },
                                    {
                                        title: 'Option #3',
                                        type: 'button',
                                        children: 'Option #3',
                                        status: 'danger',
                                    },
                                ]}
                            >
                                Split Button
                            </SplitButton>

                        </ListItem>

                        <ListItem>

                            <h5>List item #2</h5>

                            <Spinner
                                isLoading={true}
                                loadingMessage={'Example spinner'}
                            />

                        </ListItem>

                        <ListItem>

                            <h5>List item #3</h5>

                            <OrderedList>

                                <h6>Ordered list</h6>

                                <ListItem>
                                    List item A
                                </ListItem>

                                <ListItem>
                                    List item B
                                </ListItem>

                                <ListItem>
                                    List item C
                                </ListItem>

                            </OrderedList>

                        </ListItem>

                    </UnorderedList>

                </Article>

            </Section>

        </Main>

        <Footer>
            <p><small>Copyright &copy; {new Date().getFullYear()} ThugNerdz. All rights reserved.</small></p>
        </Footer>

    </Fragment>;
};

export default App;
