import React, {
    Fragment,
    useState,
} from 'react';
import {
    Article,
    Button,
    DragHandle,
    Dropdown,
    DropdownMenuButton,
    Footer,
    Form,
    Header,
    InputList,
    ListItem,
    Main,
    Modal,
    Notification,
    OrderedList,
    Select,
    Section,
    SortableList,
    SortableListItem,
    Spinner,
    SplitButton,
    Tooltip,
    UnorderedList,
    useDragItem,
    useDragItemContext,
} from '@muckington/react-components';

const App = () => {

    const defaultSortableItems = [
        {
            index: 0,
            content: <Fragment
                key={0}
            >

                <p>Color 1</p>

                <Button
                    onClick={() => handleDelete(0)}
                >Delete</Button>
            </Fragment>,
        },
        {
            index: 1,
            content: <Fragment
                key={1}
            >

                <p>Color 2</p>

                <Button
                    onClick={() => handleDelete(1)}
                >Delete</Button>
            </Fragment>,
        },
        {
            index: 2,
            content: <Fragment
                key={2}
            >

                <p>Color 3</p>

                <Button
                    onClick={() => handleDelete(2)}
                >Delete</Button>
            </Fragment>,
        },
        {
            index: 3,
            content: <Fragment
                key={3}
            >

                <p>Color 4</p>

                <Button
                    onClick={() => handleDelete(3)}
                >Delete</Button>
            </Fragment>,
        },
        {
            index: 4,
            content: <Fragment
                key={4}
            >

                <p>Color 5</p>

                <Button
                    onClick={() => handleDelete(4)}
                >Delete</Button>
            </Fragment>,
        },
    ];

    const [sortableListItems, setSortableListItems] = useState(defaultSortableItems);

    const handleDelete = (index) => {

        setSortableListItems(existingItems => {

            // The entire useState callback must be defined in order to ensure that the sortable list honours indexes

            return existingItems.filter((item) => item.index !== index);
        });
    };

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [menuIsVisible, setMenuIsVisible] = useState(false);

    const selectOption = (value) => {

        if (!(value in selectedOptions)) {
            setSelectedOptions([
                ...selectedOptions,
                value,
            ]);
        }
    };

    const deselectOption = (value) => {

        const selectedOption = selectedOptions.find(option => option === value);

        if (selectedOption !== undefined) {

            const updatedSelectedOptions = selectedOptions.filter(option => option !== value);

            setSelectedOptions(updatedSelectedOptions);
        }
    };

    const moveItems = (items = [], activeIndex, desiredIndex) => {
        const draftItems = [...items];
        const activeItem = draftItems[activeIndex];
        draftItems.splice(activeIndex, 1);
        draftItems.splice(desiredIndex, 0, activeItem);
        return draftItems;
    };

    const onDrop = (
        dragIndex,
        overIndex,
    ) => {

        const updatedItems = moveItems(sortableListItems, dragIndex, overIndex);

        setSortableListItems(updatedItems);
    };

    const context = useDragItemContext({
        onDrop,
    });

    const rarities = [
        {
            id: 0,
            label: 'Common',
            rarity: 1
        },
        {
            id: 1,
            label: 'Uncommon',
            rarity: 2
        },
        {
            id: 2,
            label: 'Rare',
            rarity: 3
        },
        {
            id: 3,
            label: 'Epic',
            rarity: 4
        },
        {
            id: 4,
            label: 'Legendary',
            rarity: 5
        },
        {
            id: 5,
            label: 'Mythic',
            rarity: 6
        }
    ];

    const [rarity, setRarity] = useState({
        qualityId: 0,
        rarity: 1,
    });

    const handleQSelect = (val) => {

        console.log('val', val);

        const newRarity = rarities.find(r => r.id === val);

        setRarity({
            ...rarity,
            qualityId: newRarity.id,
        });
    };

    const [browser1IsVisible, setBrowser1IsVisible] = useState(false);
    const [browser2IsVisible, setBrowser2IsVisible] = useState(false);

    const hideBrowser = (number) => {

        switch (number) {
        case 2:
            setBrowser2IsVisible(false);
            break;
        default:
            setBrowser1IsVisible(false);
        }
    };

    return <Fragment>

        <Header>

            <Tooltip
                text={'Example heading tooltip'}
            >
                <h1>ThugNerdz&apos; React Components Example</h1>
            </Tooltip>

            <Notification>Date: {new Date().toDateString()}</Notification>

        </Header>

        <Main>

            <Section>


                <h2>Section component</h2>

                <Button onClick={() => setBrowser1IsVisible(true)}>Modal 1</Button>


                <Modal
                    show={browser1IsVisible}
                    handleClose={() => hideBrowser(1)}
                >

                    {!browser2IsVisible && <Form>

                        <InputList inputs={[
                            {
                                title: 'Upload an image',
                                label: 'Image :',
                                type: 'file',
                                name: 'trait-fish-upload',
                                placeholder: 'Choose a file...',
                                // value: sortedValue,
                                // multi: true,
                                // errorMsg: errorMsg,
                                // disabled: disabled,
                                // className: styles.dropdown,
                                onChange: (e) => console.log(e),
                            }
                        ]} />

                        <Button onClick={() => setBrowser2IsVisible(true)}>Modal 2</Button>

                    </Form>}

                    <Modal
                        show={browser2IsVisible}
                        handleClose={() => hideBrowser(2)}
                    >

                        <Form>

                            <InputList inputs={[
                                {
                                    title: 'Upload an image',
                                    label: 'Image :',
                                    type: 'file',
                                    name: 'trait-image-upload',
                                    placeholder: 'Choose a file...',
                                    // value: sortedValue,
                                    // multi: true,
                                    // errorMsg: errorMsg,
                                    // disabled: disabled,
                                    // className: styles.dropdown,
                                    onChange: (e) => console.log(e),
                                }
                            ]} />

                        </Form>

                    </Modal>

                </Modal>


                <Article>

                    <h3>Article component</h3>

                    <InputList inputs={[
                        {
                            label: 'Quality :',
                            type: 'select',
                            name: 'trait-quality',
                            multi: false,
                            isSearchable: false,
                            placeholder: 'Nipples',
                            options: [
                                {
                                    label: 'Common',
                                    value: 0,
                                    title: 'Common'
                                },
                                {
                                    label: 'Uncommon',
                                    value: 1,
                                    title: 'Uncommon'
                                },
                                {
                                    label: 'Rare',
                                    value: 2,
                                    title: 'Rare'
                                },
                                {
                                    label: 'Epic',
                                    value: 3,
                                    title: 'Epic'
                                },
                                {
                                    label: 'Legendary',
                                    value: 4,
                                    title: 'Legendary'
                                },
                                {
                                    label: 'Mythic',
                                    value: 5,
                                    title: 'Mythic'
                                }
                            ],
                            value: rarity.qualityId,
                            onSelect: handleQSelect,
                            errorMsg: '',
                            disabled: false,
                        },
                    ]} />

                    <SortableList
                        items={sortableListItems.map((item, idx) => {

                            const {
                                listeners,
                            } = useDragItem(context, idx);

                            return <SortableListItem
                                key={idx}
                                index={idx}
                                context={context}
                                preview={<ListItem>
                                    {item.content}
                                </ListItem>}
                            >
                                <DragHandle listeners={listeners} />
                                {item.content}
                            </SortableListItem>;
                        })}
                    />

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
