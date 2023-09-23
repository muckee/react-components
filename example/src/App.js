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
} from '@muckington/react-components';

const App = () => {

  return (<Fragment>

    <Header>

      <h1>ThugNerdz' React Components Example</h1>

      <p>Date: {new Date().toDateString()}</p>

    </Header>

    <Main>

      <Section>

        <h2>Section component</h2>

        <Article>

          <h3>Article component</h3>

          <UnorderedList>

            <h4>UnorderedList</h4>

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
                  title: `Split button options`,
                  type: `button`,
                  // className: props.className,
                  // status: props.status,
                  // onClick: props.onClick,
                  // onMouseDown: props.onMouseDown,
                  // onMouseUp: props.onMouseUp,
                  // onMouseOut: props.onMouseOut,
                  // disabled: props.disabled,

                }}
                menuItems={[
                  {
                    title: `Option #1`,
                    type: `button`,
                    children: `Option #1`,
                  },
                  {
                    title: `Option #2`,
                    type: `button`,
                    children: `Option #2`,
                  },
                  {
                    title: `Option #3`,
                    type: `button`,
                    children: `Option #3`,
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
                loadingMessage={`Example spinner`}
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

  </Fragment>);
};

export default App;
