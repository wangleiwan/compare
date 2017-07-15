import React from "react-native";
import { shallow, mount } from "enzyme";
import { expect } from "chai";
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { Contact } from "../../screens/Contact";

@suite("<Contact />")
class ContactTest {

  auth = {
    user: {
      isAdmin: () => {}
    }
  };

  data = {
    createdOn: "2017-05-10T18:21:02.409Z",
    modifiedOn: "2017-05-10T18:21:02.409Z",
    accountId: 105990045,
    name: "Peter",
    userId: "peterw@dev6.com",
    email: "peterw@dev6.com",
    role: "USER",
    emailVerified: false,
    extensionVerified: false,
    mobile: "+16478661140",
    mobileVerified: false,
    score: null,
    phoneVerified: false,
    sipAddress: "peterw@mitel.mitel-api.com",
    sipPassword: "718722426471",
    createdBy: "peterw@dev6.com",
    modifiedBy: "peterw@dev6.com"
  };

  navigator = {
    pop: () => {}
  };

  user = {
    userId: "jamesm@dev6.com"
  };

  users = {
    data: [
      {
        createdOn: "2017-05-08T21:12:17.804Z",
        modifiedOn: "2017-05-08T21:12:17.804Z",
        accountId: 105990045,
        name: "Peter",
        userId: "peterw@dev6.com",
        email: "peterw@dev6.com",
        role: "USER",
        emailVerified: true,
        extensionVerified: false,
        mobile: "+16478661140",
        mobileVerified: true,
        score: null,
        phoneVerified: false,
        sipAddress: "peterw@mitel.mitel-api.com",
        sipPassword: "833447942416",
        createdBy: "peterw@dev6.com",
        modifiedBy: "peterw@dev6.com"
      },
      {
        createdOn: "2017-05-08T20:28:22.484Z",
        modifiedOn: "2017-05-08T20:28:22.484Z",
        accountId: 105990045,
        name: "Shu",
        userId: "szhangsyr@gmail.com",
        email: "szhangsyr@gmail.com",
        role: "USER",
        emailVerified: false,
        extensionVerified: false,
        mobile: "+12269781212",
        mobileVerified: false,
        score: null,
        phoneVerified: false,
        sipAddress: "szhangsyr@mitel.mitel-api.com",
        sipPassword: "349188312794",
        createdBy: "szhangsyr@gmail.com",
        modifiedBy: "szhangsyr@gmail.com"
      }
    ],
    mapped: {
      "peterw@dev6.com": {
        createdOn: "2017-05-08T21:12:17.804Z",
        modifiedOn: "2017-05-08T21:12:17.804Z",
        accountId: 105990045,
        name: "Peter",
        userId: "peterw@dev6.com",

        email: "peterw@dev6.com",
        role: "USER",
        emailVerified: true,
        extensionVerified: false,
        mobile: "+16478661140",
        mobileVerified: true,
        score: null,
        phoneVerified: false,
        sipAddress: "peterw@mitel.mitel-api.com",
        sipPassword: "833447942416",
        createdBy: "peterw@dev6.com",
        modifiedBy: "peterw@dev6.com"
      },
      "szhangsyr@gmail.com": {
        createdOn: "2017-05-08T20:28:22.484Z",
        modifiedOn: "2017-05-08T20:28:22.484Z",
        accountId: 105990045,
        name: "Shu",
        userId: "szhangsyr@gmail.com",
        email: "szhangsyr@gmail.com",
        role: "USER",
        emailVerified: false,
        extensionVerified: false,
        mobile: "+12269781212",
        mobileVerified: false,
        score: null,
        phoneVerified: false,
        sipAddress: "szhangsyr@mitel.mitel-api.com",
        sipPassword: "349188312794",
        createdBy: "szhangsyr@gmail.com",
        modifiedBy: "szhangsyr@gmail.com"
      }
    },
    loading: false,
    error: undefined,
    request: ''
  };

  @test("render default view")
  render_view_1() {
    const wrapper = shallow(
      <Contact
        users={this.users}
        user={this.user}
        auth={this.auth}
        data={this.data}
        route={{ isInEditMode: false }}
        navigator={this.navigator}
      />
    );

    expect(wrapper.find("View")).to.have.length(31);
    expect(wrapper.find("A")).to.have.length(12);
    expect(wrapper.find("MiText")).to.have.length(6);
    expect(wrapper.find("MiTransText")).to.have.length(15);
    expect(wrapper.find("ScrollView")).to.have.length(1);
  }

  @test("simulate clicks on component <A>")
  simulate_clicks_A() {
    const wrapper = shallow(
      <Contact
        user={this.user}
        data={this.data}
        auth={this.auth}
        route={{ isInEditMode: false }}
        navigator={this.navigator}
        users={this.users}
      />
    );

    wrapper.find("A").forEach(function(node) {
      node.simulate("press");
    });
  }
}
