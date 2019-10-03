#include <eosio/eosio.hpp>

using namespace eosio;
using namespace std;

class [[eosio::contract("addressbook")]] addressbook : public eosio::contract {

  public:
  
  addressbook(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

  [[eosio::action]]
  void upsert(name user, std::string first_name, std::string last_name, std::string street, std::string city, std::string state) {
    // require_auth( user );
    std::hash<std::string> hasher;
    auto hashed = hasher(first_name);
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
       row.first_name = first_name;
       row.last_name = last_name;
       row.street = street;
       row.city = city;
       row.state = state;
      });
    }

    else {

      eosio::print("else");
      addresses.modify(iterator, user, [&]( auto& row ) {
        row.key = test;
        row.first_name = first_name;
        row.last_name = last_name;
        row.street = street;
        row.city = city;
        row.state = state;
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
    std::string first_name;
    std::string last_name;
    std::string street;
    std::string city;
    std::string state;
    uint64_t primary_key() const { return key; }
  };
  typedef eosio::multi_index<"people"_n, person> address_index;

};   
