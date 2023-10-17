import React, {
    Fragment,
    useState,
} from 'react';
import {
    Article,
    Button,
    Dropdown,
    DropdownMenuButton,
    Footer,
    Header,
    ListItem,
    Main,
    OrderedList,
    Select,
    Section,
    Spinner,
    SplitButton,
    Tooltip,
    UnorderedList,
} from '@muckington/react-components';

const App = () => {

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [menuIsVisible, setMenuIsVisible] = useState(false);

    const selectOption = (value) => {

        if(!(value in selectedOptions)) {
            setSelectedOptions([
                ...selectedOptions,
                value,
            ]);
        }
    };

    const deselectOption = (value) => {

        const selectedOption = selectedOptions.find(option => option === value);

        if(selectedOption !== undefined) {

            const updatedSelectedOptions = selectedOptions.filter(option => option !== value);

            setSelectedOptions(updatedSelectedOptions);
        }
    };

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

                            <SplitButton
                                position='right'
                                status='warning'
                                items={[
                                    {
                                        children: 'Primary button',
                                        type: 'button',
                                        status: 'danger',
                                    },
                                    {
                                        children: '>',
                                        type: 'button',
                                        status: 'success',
                                    },
                                ]}
                            />

                            <Dropdown
                                menuIsVisible={menuIsVisible}
                                setMenuIsVisible={setMenuIsVisible}
                                menuItems={[
                                    <DropdownMenuButton
                                        key={0}
                                        status='primary'
                                        highlight={true}
                                        onClick={() => setMenuIsVisible(false)}
                                    >Option #1: Primary example</DropdownMenuButton>,
                                    // {
                                    //     title: 'Option #1: Primary example',
                                    //     type: 'button',
                                    //     children: 'Option #1: Primary example',
                                    //     status: 'primary',
                                    // },
                                    // {
                                    //     title: 'Option #2: Disabled example',
                                    //     type: 'button',
                                    //     children: 'Option #2: Disabled example',
                                    //     disabled: true,
                                    // },
                                    // {
                                    //     title: 'Option #3: Warning example',
                                    //     type: 'button',
                                    //     children: 'Option #3: Warning example',
                                    //     status: 'warning',
                                    // },
                                    // {
                                    //     title: 'Option #4: Default example',
                                    //     type: 'button',
                                    //     children: 'Option #4: Default example',
                                    // }
                                ]}
                            />

                            <Select
                                status='primary'
                                onSelect={selectOption}
                                onDeselect={deselectOption}
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
                                value={selectedOptions}
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
