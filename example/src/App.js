import React, {
  Fragment
} from 'react';
import {
  Header,
  Main,
  Section,
  Article,
  Button,
  OrderedList,
  UnorderedList,
  ListItem,
  Footer,
  Spinner
} from '@muckee/react-components';

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
              >Disabled button</Button>

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
