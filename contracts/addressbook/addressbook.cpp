#include <eosio/eosio.hpp>

using namespace eosio;
using namespace std;

class [[eosio::contract("addressbook")]] addressbook : public eosio::contract {

  public:
  
  addressbook(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

  [[eosio::action]]
  void upsert(name user, std::string company, std::string framework, std::string email, std::string task) {
    // require_auth( user );
    std::hash<std::string> hasher;
    auto hashed = hasher(company);
    long test = static_cast<long>(hashed);
    eosio::print(test);
 

    address_index addresses( get_self(), get_first_receiver().value );

    eosio::print("got addresses");
    // auto iterator = addresses.find(user.value);
    auto iterator = addresses.find(test);
    if (iterator == addresses.end()) {

      eosio::print("adding");
      addresses.emplace(user, [&]( auto& row ) {
       row.key = test;
       row.company = company;
       row.framework = framework;
       row.email = email;
       row.task = task;
      });
    }

    else {

      eosio::print("else");
      addresses.modify(iterator, user, [&]( auto& row ) {
        row.key = test;
        row.company = company;
        row.framework = framework;
        row.email = email;
        row.task = task;
      });
    }
  }
  [[eosio::action]]
    void erase(uint64_t k) {
    // require_auth(user);

    address_index addresses( get_self(), get_first_receiver().value);

    auto iterator = addresses.find(k);
    check(iterator != addresses.end(), "Record does not exist");
    addresses.erase(iterator);
  }


  [[eosio::action]]
  void debug() {
    std::hash<std::string> hasher;
    auto hashed = hasher("hello");
    long test = static_cast<long>(hashed);
    eosio::print(test);
  }


    private:
  struct [[eosio::table]] person {
    long key;
    std::string company;
    std::string framework;
    std::string email;
    std::string task;
    uint64_t primary_key() const { return key; }
  };
  typedef eosio::multi_index<"people"_n, person> address_index;

};   
