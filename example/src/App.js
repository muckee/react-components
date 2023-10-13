import React, {
    Fragment
} from 'react';
import {
    Article,
    Button,
    Dropdown,
    Footer,
    Header,
    ListItem,
    Main,
    Select,
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

                            {/* <Dropdown
                                status='primary'
                                primaryButtonProps={{
                                    children: 'Primary button',
                                    type: 'button',
                                    status: 'danger',
                                }}
                                secondaryButtonProps={{
                                    type: 'button',
                                    status: 'warning',
                                }}
                                menuItems={[
                                    'this',
                                    'is',
                                    'a',
                                    'list',
                                    'of',
                                    'things',
                                ]}
                            /> */}

                            <Button
                                disabled={true}
                            >
                                Disabled button
                            </Button>

                            {/* <SplitButton
                                position='left'
                                status='danger'
                                primaryButtonProps={{
                                    children: 'Primary button',
                                    type: 'button',
                                    status: 'danger',
                                }}
                                secondaryButtonProps={{
                                    children: '>',
                                    type: 'button',
                                    status: 'warning',
                                }}
                            /> */}

                            {/* <SplitButton
                                splitButtonProps={{
                                    title: 'Split button options',
                                    type: 'button',
                                    // status: 'danger',
                                }}
                                menuItems={[
                                    {
                                        title: 'Option #1: Primary example',
                                        type: 'button',
                                        children: 'Option #1: Primary example',
                                        status: 'primary',
                                    },
                                    {
                                        title: 'Option #2: Disabled example',
                                        type: 'button',
                                        children: 'Option #2: Disabled example',
                                        disabled: true,
                                    },
                                    {
                                        title: 'Option #3: Warning example',
                                        type: 'button',
                                        children: 'Option #3: Warning example',
                                        status: 'warning',
                                    },
                                    {
                                        title: 'Option #4: Default example',
                                        type: 'button',
                                        children: 'Option #4: Default example',
                                    }
                                ]}
                            >
                                Split Button
                            </SplitButton> */}

                            <Select
                                status='primary'
                                handleSelectChange={(selectedItems) => {
                                    console.log(selectedItems);
                                }}
                                label={'test select'}
                                multi={true}
                                name={'test-select'}
                                options={[
                                    {
                                        label: 'Fish',
                                        value: 'fish',
                                    },
                                    {
                                        label: 'Rodent',
                                        value: 2,
                                    },
                                    {
                                        label: 'Perceptual',
                                        value: '17',
                                    },
                                ]}
                                title={'Test select'}
                            />

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
